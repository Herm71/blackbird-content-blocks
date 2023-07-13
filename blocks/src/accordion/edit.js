
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import { 
	useBlockProps, 
	InspectorControls, 
	InnerBlocks, 
	RichText
} from '@wordpress/block-editor';

import {
	Panel,
	PanelRow,
	PanelBody,
	CheckboxControl
} from '@wordpress/components';
// import { SPACE } from '@wordpress/keycodes';
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
	const keyDownListener = (e) => {
		if (e.keyCode === 32) {
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

	return (
		<>
			<InspectorControls key="setting">
				<Panel>
					<PanelRow>
						<PanelBody>
							<fieldset>
								<CheckboxControl
									label="Open on page load"
									checked={attributes.openOnPageLoad}
									onChange={newValue => setAttributes({ openOnPageLoad: newValue })}
								></CheckboxControl>
							</fieldset>
						</PanelBody>
					</PanelRow>
				</Panel>
			</InspectorControls>

			<details {...blockProps} className={className} open={showInnerBlocks}>
				<RichText
					tagName="summary"
					value={title}
					onKeyDown={keyDownListener}
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
