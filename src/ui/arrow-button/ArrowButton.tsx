import arrow from 'src/images/arrow.svg';

import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

type ArrowButton = (props: {
	willCloseOnClick: boolean;
	onClick: () => void;
}) => JSX.Element;

export const ArrowButton: ArrowButton = ({ willCloseOnClick, onClick }) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(
				styles.container,
				willCloseOnClick && styles.container_open
			)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='изображение стрелки'
				className={clsx(styles.arrow, willCloseOnClick && styles.arrow_open)}
			/>
		</div>
	);
};
