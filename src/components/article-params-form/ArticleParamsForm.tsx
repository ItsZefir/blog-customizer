import clsx from 'clsx';
import { useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useModalClose } from 'src/hooks/useModalClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsForm = (props: {
	setArticleStyleState: (articleState: ArticleStateType) => void;
}) => JSX.Element;

export const ArticleParamsForm: ArticleParamsForm = ({
	setArticleStyleState,
}) => {
	const [inputArticleStyleState, setInputArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useModalClose({
		isOpened,
		setClosed: () => setIsOpened(false),
		containerRef,
	});

	const handleApplyClick = () => {
		setArticleStyleState(inputArticleStyleState);
		setIsOpened(false);
	};

	const handleResetClick = () => {
		setInputArticleStyleState(defaultArticleState);
		setArticleStyleState(defaultArticleState);
		setIsOpened(false);
	};

	const onOptionSelected =
		(optionName: keyof ArticleStateType) =>
		(selected: OptionType): void => {
			setInputArticleStyleState((prev) => ({
				...prev,
				[optionName]: selected,
			}));
		};

	return (
		<div ref={containerRef} className='form-container'>
			<ArrowButton
				willCloseOnClick={isOpened}
				onClick={() => setIsOpened(!isOpened)}
			/>
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={inputArticleStyleState.fontFamilyOption}
						onChange={onOptionSelected('fontFamilyOption')}
					/>
					<RadioGroup
						key='font-size-group'
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={inputArticleStyleState.fontSizeOption}
						onChange={onOptionSelected('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputArticleStyleState.fontColor}
						onChange={onOptionSelected('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputArticleStyleState.backgroundColor}
						onChange={onOptionSelected('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputArticleStyleState.contentWidth}
						onChange={onOptionSelected('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApplyClick}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
