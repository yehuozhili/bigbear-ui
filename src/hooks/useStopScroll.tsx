function useStopScroll(state: boolean, delay: number, open?: boolean) {
	if (open) {
		let width = window.innerWidth - document.body.clientWidth;
		if (state) {
			document.body.style.overflow = "hidden";
			document.body.style.width = `calc(100% - ${width}px)`;
		} else {
			//等动画渲染
			setTimeout(() => {
				document.body.style.overflow = "auto";
				document.body.style.width = `100%`;
			}, delay);
		}
	}
}

export default useStopScroll;
