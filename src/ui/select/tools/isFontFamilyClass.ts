import {
	FontFamiliesClasses,
	fontFamilyClasses,
} from 'src/constants/articleProps';

/** typeGuard */
export function isFontFamilyClass(
	family?: string | FontFamiliesClasses
): family is FontFamiliesClasses {
	return fontFamilyClasses.includes(family as FontFamiliesClasses);
}
