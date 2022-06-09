<?php
/**
 * DNG Loader.
 *
 * @package domain-name-generator
 * @since 1.0.0
 */

if ( ! class_exists( 'DNG_Controller' ) ) :

	/**
	 * DNG_Controller
	 *
	 * @since 1.0.0
	 */
	class DNG_Controller {

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

			add_action( 'wp_enqueue_scripts', array( $this, 'register_domain_name_generator_scripts' ) );

			add_shortcode( 'domain-name-generator', array( $this, 'render_domain_name_generator' ) );

			add_action(
				'wp_head',
				function() {
					echo '<script src="https://unpkg.com/@rstacruz/startup-name-generator@0.2.1/dist/startup-name-generator.js"></script>
                        <script src="https://unpkg.com/@yaireo/tagify"></script>
                        <script src="https://unpkg.com/@yaireo/tagify/dist/tagify.polyfills.min.js"></script>
                        <link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" />';
				}
			);

		}

		/**
		 * Register domain name script.
		 */
		
		public function register_domain_name_generator_scripts() {

			wp_register_style( 'dng-shortcode-css', DNG_URL . 'assets/css/dng-shortcode.css', null, DNG_VER, 'all' );
			wp_register_style( 'dng-admin-css', DNG_URL . 'dist/build/admin.css', null, DNG_VER, 'all' );
			
			wp_register_script( 'dng-shortcode-js', DNG_URL . 'dist/build/admin.js', array( 'wp-element', 'wp-polyfill' ), DNG_VER, true );

			$tlds = get_option( 'dng-tlds-list' );

			if ( ! $tlds ) {

				$response = wp_remote_get(
					'https://sugapi.verisign-grs.com/ns-api/2.0/supported-tlds',
					array(
						'timeout'   => 10,
						'sslverify' => false,
					)
				);
				$response = json_decode( wp_remote_retrieve_body( $response ), true );
				$tlds     = array_column( $response, 'unicode' );

				update_option( 'dng-tlds-list', $tlds, false );
			}

			wp_localize_script(
				'dng-shortcode-js',
				'dngData',
				array(
					'tlds'      => $tlds,
					'dng_token' => wp_create_nonce( 'dng/domain/generator' ),
					'ajax_url'  => admin_url( 'admin-ajax.php' ),
				)
			);

		}


		/**
		 * Render Domain Name Generator Shortcode.
		 */
		public function render_domain_name_generator() {

			wp_enqueue_style( 'dng-shortcode-css' );
			wp_enqueue_style( 'dng-admin-css' );
			wp_enqueue_script( 'dng-shortcode-js' );

			echo '<div id="dng-domain-name-wrapper"></div>';

		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	DNG_Controller::get_instance();

endif;

