import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';

import {
	Disabled,
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	CheckboxControl,
} from '@wordpress/components';

import metadata from './block.json';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'bb-accordion-block',
	} );

	return (
		<>
			<InspectorControls key="setting">
				<Panel>
					<PanelBody>
						<CheckboxControl
							label="Open on page load"
							checked={attributes.openOnPageLoad}
							onChange={newValue => setAttributes({ openOnPageLoad: newValue })}
						></CheckboxControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<details className='ucsc-accordion' open="true" >
				<summary><input
					placeholder='Accordion Item Title'
					value={attributes.title}
					onKeyUp={event => {
						event.preventDefault();
					}}
					onChange={e => setAttributes({ title: e.target.value })}
					style={{ "width": "100%" }} /></summary>
				<InnerBlocks />
			</details>
		</>
	);
}
