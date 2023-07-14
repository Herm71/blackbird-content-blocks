
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
	PanelHeader,
	PanelRow,
	PanelBody,
	CheckboxControl,
	ToggleControl
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { SPACE } from '@wordpress/keycodes';
import './editor.scss';
export default function Edit( { 
	attributes, 
	clientId,
	isSelected,
	setAttributes,
 } ) {
	const blockProps = useBlockProps( {
		className: 'accordion-block',
	} );

	const { title, openOnPageLoad } = attributes;
	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
 

	const summaryRef = useRef(null);
	const keyUpListener = (e) => {
		if (e.keyCode === SPACE ) {
			e.preventDefault();
		}
	};

	const clickListener = (e) => e.preventDefault();
	useEffect(() => {
		if (!summaryRef.current) {
			return;
		}

		summaryRef.current.addEventListener('keyup', keyUpListener);
		summaryRef.current.addEventListener('click', clickListener);
		return () => {
			summaryRef.current.removeEventListener('keyup', keyUpListener);
			summaryRef.current.removeEventListener('click', clickListener);
		};
	}, [summaryRef.current]);

	const isInnerBlockSelected = useSelect(
		(select) =>
			select('core/block-editor').hasSelectedInnerBlock(clientId),
		[clientId]
	);

	const showInnerBlocks =
		attributes.openOnPageLoad || isSelected || isInnerBlockSelected;
	



	return (
		<>
			<InspectorControls key="setting">
				<Panel header="Accordion Block">
					<PanelBody>
						<PanelRow>
							<PanelHeader>Block Settings</PanelHeader>

								<CheckboxControl
									label="Open on page load"
									checked={openOnPageLoad}
									onChange={newValue => setAttributes({ openOnPageLoad: newValue })}
								></CheckboxControl>
								
						</PanelRow>
						<PanelRow>
							<PanelHeader>Block Settings -- Toggle</PanelHeader>
							<ToggleControl
								label={__('Open by default')}
								onChange={(openOnPageLoad) =>
									setAttributes({ openOnPageLoad })
								}
								checked={attributes.openOnPageLoad}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<details {...blockProps} open={showInnerBlocks}>
				<RichText
					tagName="summary"
					value={title}
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
