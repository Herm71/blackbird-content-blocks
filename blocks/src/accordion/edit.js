import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import { 
	useBlockProps, 
	InspectorControls, 
	InnerBlocks, 
	RichText,
	BlockControls
} from '@wordpress/block-editor';

import {
	Panel,
	PanelRow,
	PanelBody,
	CheckboxControl,
	ToggleControl,
} from '@wordpress/components';

import { SPACE } from '@wordpress/keycodes';

import './editor.scss';

export default function DetailsEdit( { 
	attributes, 
	setAttributes,
	className,
	clientId,
	isSelected
 } ) {
	const blockProps = useBlockProps( {
		className: 'bb-accordion-block',
	} );
	const keyUpListener = (e) => {
		if (e.keyCode === SPACE) {
			e.preventDefault();
		}
	};

	// const clickListener = (e) => e.preventDefault();
	

	const isInnerBlockSelected = useSelect(
		(select) =>
			select('core/block-editor').hasSelectedInnerBlock(clientId),
		[clientId]
	);

	const showInnerBlocks =
		attributes.initialOpen || isSelected || isInnerBlockSelected;

	const { title } = attributes;

	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};

	const onChangePageLoad = (newValue => setAttributes({openOnPageLoad: newValue}));

	return (
		<>
			<InspectorControls key="setting">
				<Panel>
					<PanelRow>
						<PanelBody>
							<CheckboxControl
								label="Open on page load"
								checked={attributes.openOnPageLoad}
								onChange={onChangePageLoad}
							></CheckboxControl>
						</PanelBody>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Open by default')}
							onChange={(openOnPageLoad) =>
								setAttributes({ openOnPageLoad })
							}
							checked={attributes.openOnPageLoad}
						/>
					</PanelRow>
				</Panel>
			</InspectorControls>

			<details {...blockProps} className={className} open={showInnerBlocks}>
				<RichText
					tagName="summary"
					value={title}
					onKeyUp={keyUpListener}
					onChange={onChangeTitle}
					placeholder={__(
						'Enter the summary text...',
						'accordion-block'
					)}
					aria-label={__('Summary text')}
				/>
				<InnerBlocks />
			</details>

		</>
	);
}
