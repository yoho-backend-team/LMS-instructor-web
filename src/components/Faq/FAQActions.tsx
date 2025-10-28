import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQActionsProps {
	onExpandAll: () => void;
	onCollapseAll: () => void;
	totalItems: number;
	expandedCount: number;
}

const FAQActions: React.FC<FAQActionsProps> = ({
	onExpandAll,
	onCollapseAll,
	totalItems,
	expandedCount,
}) => {
	return (
		<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
			<div
				style={{
					color: COLORS.text_desc,
					fontFamily: FONTS.para_01.fontFamily,
					fontSize: FONTS.heading_05.fontSize,
				}}
			>
				Showing {totalItems} FAQ{totalItems !== 1 ? 's' : ''}
				{expandedCount > 0 && ` (${expandedCount} expanded)`}
			</div>

			<div className='flex gap-3'>
				<button
					onClick={onExpandAll}
					className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl px-4 py-2 shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
					// style={{
					// 	backgroundColor: COLORS.bg_Colour,
					// 	color: COLORS.text_title,
					// 	fontFamily: FONTS.heading_06.fontFamily,
					// 	fontSize: FONTS.heading_06.fontSize,
					// 	fontWeight: FONTS.heading_06.fontWeight,
					// 	boxShadow: `
					//     rgba(255, 255, 255, 0.7) 3px 3px 5px,
					//     rgba(189, 194, 199, 0.75) 2px 2px 3px inset
					//   `,
					// 	border: 'none',
					// 	minHeight: '40px',
					// }}
				>
					Expand All
				</button>

				<button
					onClick={onCollapseAll}
					className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl px-4 py-2 shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
					// style={{
					// 	backgroundColor: COLORS.bg_Colour,
					// 	color: COLORS.text_title,
					// 	fontFamily: FONTS.heading_06.fontFamily,
					// 	fontSize: FONTS.heading_06.fontSize,
					// 	fontWeight: FONTS.heading_06.fontWeight,
					// 	boxShadow: `
					//     rgba(255, 255, 255, 0.7) 3px 3px 5px,
					//     rgba(189, 194, 199, 0.75) 2px 2px 3px inset
					//   `,
					// 	border: 'none',
					// 	minHeight: '40px',
					// }}
				>
					Collapse All
				</button>
			</div>
		</div>
	);
};

export default FAQActions;
