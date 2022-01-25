export default function (setUser) {
	setUser({});
	localStorage.removeItem('data');
	window.location.href = '/login';
}
