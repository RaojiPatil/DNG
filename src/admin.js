import App from './components/App';
import 'flowbite';

// console.log( StartupNameGenerator('Need Decision') )

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
		<App />,
		document.getElementById('dng-domain-name-wrapper')
	);
});
