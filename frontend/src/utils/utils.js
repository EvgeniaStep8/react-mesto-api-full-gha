const handleOverlayClick = (callback) => {
	return (event) => {
		if (event.target===event.currentTarget) {
			callback();
		}
	}
}

export default handleOverlayClick;