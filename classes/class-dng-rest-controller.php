<?php
/**
 * DNG REST Controller
 *
 * @package bsf-google-one-tap
 * @since 1.0.0
 */

if ( ! class_exists( 'DNG_REST_Controller' ) ) :

	/**
	 * DNG_REST_Controller
	 *
	 * @since 1.0.0
	 */
	class DNG_REST_Controller {

		/**
		 * Instance
		 *
		 * @access private
		 * @var object Class Instance.
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Initiator
		 *
		 * @since 1.0.0
		 * @return object initialized object of class.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {

			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );

		}

		/**
		 * Register endpoint for SSO.
		 */
		
		public function register_endpoints() {

			register_rest_route(
				'dng',
				'/domain/generator',
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'domain_name_generator' ),
					'args'                => array(
						'domains'     => array(
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'tlds'        => array(
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'token'       => array(
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'use-numbers' => array(
							'type'              => 'boolean',
							'required'          => false,
							'sanitize_callback' => 'rest_sanitize_boolean',
						),
						'use-dashes'  => array(
							'type'              => 'boolean',
							'required'          => false,
							'sanitize_callback' => 'rest_sanitize_boolean',
						),
						'max-length'  => array(
							'type'              => 'integer',
							'required'          => false,
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
					'permission_callback' => function() {

						// if ( ! wp_verify_nonce( $_GET['token'], 'dng/domain/generator' ) ) {
						// return false;
						// }

						return true;

					},
				)
			);
		}

		/**
		 * Domain Name Generator API.
		 */
		public function domain_name_generator() {

			$supported_languages = array(
				'en' => 'eng',
				'fr' => 'fre',
				'es' => 'spa',
				'it' => 'ita',
				'pt' => 'por',
				'de' => 'ger',
				'nl' => 'dut',
				'tr' => 'tur',
				'vi' => 'vie',
				'zh' => 'chi',
				'ja' => 'jpn',
				'ko' => 'kor',
				'hi' => 'hin',
				'id' => 'ind',
			);

			$tlds = $_GET['tlds'];
			$lang = substr( $_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2 );

			$gen_args = array(
				'tlds'        => $tlds,
				'use-numbers' => $_GET['use-numbers'] ?? 'false',
				'use-dashes'  => $_GET['use-dashes'] ?? 'false',
				'max-length'  => isset( $_GET['max-length'] ) ? (int) $_GET['max-length'] : '63',
				'max-results' => 100,
				'lang'        => $supported_languages[ $lang ] ?? 'eng',
			);

			$domains = array_map(
				function( $value ) {
					return str_replace( ' ', '', $value );
				},
				explode( ',', $_GET['domains'] )
			);

			$requests_array = array();

			foreach ( $domains as $domain ) {

				$requests_array[] = array(
					'ext-' . $domain               => array(
						'url'     => add_query_arg(
							array(
								'include-registered' => 'true',
								'tlds'               => $tlds,
								'names'              => $domain,
							),
							 'https://sugapi.verisign-grs.com/ns-api/2.0/bulk-check'
							//'https://domain-checker7.p.rapidapi.com/whois'
						),
						'type'    => 'GET',
						'headers' => array(
							'X-NAMESUGGESTION-APIKEY' => DNG_VERISIGN_API_KEY,
						),
					),
					'gens-' . $domain . '-suggest' => array(
						'url'     => add_query_arg(
							array_merge(
								array(
									'name' => $domain,
								),
								$gen_args
							),
							'https://sugapi.verisign-grs.com/ns-api/2.0/suggest'
							//'https://domain-checker7.p.rapidapi.com/whois'
						),
						'type'    => 'GET',
						'headers' => array(
							'X-NAMESUGGESTION-APIKEY' => DNG_VERISIGN_API_KEY,
						),
					),
				);
			}

			$requests_array = array_merge( ...$requests_array );

			$responses = Requests::request_multiple( $requests_array, array('verify' => false, 'verifyname' => false) );

			$response = array();
			foreach ( $domains as $domain ) {

				$generators = array();

				$domain_ext_response = $responses[ 'ext-' . $domain ];

				if ( 200 === $domain_ext_response->status_code ) {
					$domain_ext_response        = json_decode( $domain_ext_response->body, true );
					$response[ $domain ]['ext'] = $domain_ext_response['results'] ?? array();
				}

				$domain_gens_response = $responses[ 'gens-' . $domain . '-suggest' ];

				if ( 200 === $domain_gens_response->status_code ) {
					$domain_gens_response = json_decode( $domain_gens_response->body, true );
					$generators[]         = $domain_gens_response['results'] ?? array();

				}

				$generators                  = array_merge( ...$generators );
				$generators                  = array_values( array_column( $generators, null, 'name' ) );
				$response[ $domain ]['gens'] = $generators;

			}

			wp_send_json_success( $response );

		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	DNG_REST_Controller::get_instance();

endif;
