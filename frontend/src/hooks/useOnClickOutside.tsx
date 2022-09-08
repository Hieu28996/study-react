import { useEffect } from "react";

export const useOnClickOutside = (
	ref: React.RefObject<HTMLElement | null>,
	handler: (event: MouseEvent | TouchEvent) => void
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
				return;
			}

			handler(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
};
