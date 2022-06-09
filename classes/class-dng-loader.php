<?php
/**
 * DNG Loader.
 *
 * @package domain-name-generator
 * @since 1.0.0
 */

if ( ! class_exists( 'DNG_Loader' ) ) :

	/**
	 * DNG_Loader
	 *
	 * @since 1.0.0
	 */
	class DNG_Loader {

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

			$this->define_constants();

			add_action( 'plugins_loaded', array( $this, 'load_plugin' ) );

		}


		/**
		 * Define constants
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function define_constants() {

			define( 'DNG_BASE', plugin_basename( DNG_FILE ) );
			define( 'DNG_DIR', plugin_dir_path( DNG_FILE ) );
			define( 'DNG_URL', plugins_url( '/', DNG_FILE ) );
			define( 'DNG_VER', '1.0.0.11' );
			define( 'DNG_VERISIGN_API_KEY', '44aeb70a4de14383be7a47b26f7cc020' );
		}

		/**
		 * Load plugin
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function load_plugin() {
			$this->include_files();

		}

		/**
		 * Include files
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function include_files() {

			require_once DNG_DIR . 'classes/class-dng-controller.php';
			require_once DNG_DIR . 'classes/class-dng-rest-controller.php';
		}
	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	DNG_Loader::get_instance();

endif;

