import { useEffect } from "react";

export const useLazyLoadList = () => {
	useEffect(() => {
		const LazyLoading = () => {
			return;
		};

		window.addEventListener("scroll", LazyLoading);
	}, []);
};
