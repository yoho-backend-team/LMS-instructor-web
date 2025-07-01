import React, { useState } from 'react';

interface Tab {
	value: string;
	label: string;
}

interface CustomTabsProps {
	tabs: Tab[];
	defaultValue?: string;
	children: React.ReactNode;
}

export const CustomTabs = ({
	tabs,
	defaultValue,
	children,
}: CustomTabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

	return (
		<div className='w-full'>
			<div className='flex gap-3 mb-4'>
				{tabs.map((tab) => (
					<button
						key={tab.value}
						onClick={() => setActiveTab(tab.value)}
						className={`px-4 py-2 font-medium text-sm focus:outline-none ${
							activeTab === tab.value
								? 'border-b-2 bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
								: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div>
				{React.Children.map(children, (child) => {
					if (
						React.isValidElement(child) &&
						(child.props as { value?: string }).value === activeTab
					) {
						return child;
					}
					return null;
				})}
			</div>
		</div>
	);
};

interface CustomTabContentProps {
	value: string;
	children: React.ReactNode;
}

export const CustomTabContent = ({
	value,
	children,
}: CustomTabContentProps) => {
	return <div data-value={value}>{children}</div>;
};
