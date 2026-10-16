import { useEffect } from 'react';

type UseModalClose = (params: {
	containerRef: React.RefObject<HTMLElement>;
	isOpened: boolean;
	setClosed: () => void;
}) => void;

export const useModalClose: UseModalClose = ({
	containerRef,
	isOpened,
	setClosed,
}) => {
	useEffect(() => {
		if (!isOpened) return;

		const handleEscape = ({ key }: KeyboardEvent) => {
			if (key === 'Escape') {
				setClosed();
			}
		};

		const handleMousedown = ({ target }: MouseEvent) => {
			if (target instanceof Node && !containerRef.current?.contains(target)) {
				setClosed();
			}
		};

		window.addEventListener('keydown', handleEscape);
		window.addEventListener('mousedown', handleMousedown);

		return () => {
			window.removeEventListener('keydown', handleEscape);
			window.removeEventListener('mousedown', handleMousedown);
		};
	}, [containerRef, isOpened, setClosed]);
};
