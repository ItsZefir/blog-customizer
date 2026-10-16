import { Text } from 'src/ui/text';
import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	htmlType = 'button',
	type = 'default',
}: {
	title: string;
	onClick?: () => void;
	htmlType?: 'button' | 'submit' | 'reset';
	type?: 'apply' | 'clear' | 'default';
}) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		// Если это кнопка сброса, предотвращаем стандартный сброс формы
		if (htmlType === 'reset') {
			e.preventDefault();
		}
		// Если это кнопка отправки, предотвращаем перезагрузку страницы
		if (htmlType === 'submit') {
			e.preventDefault();
		}
		onClick?.();
	};

	// Определяем класс по типу (apply -> primary, clear -> secondary)
	const buttonClass = type === 'apply' ? styles.primary : styles.secondary;

	return (
		<button
			className={`${styles.button} ${buttonClass}`}
			type={htmlType}
			onClick={handleClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
