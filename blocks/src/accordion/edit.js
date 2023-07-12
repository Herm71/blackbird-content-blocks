import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';

import {
	Panel,
	PanelRow,
	PanelBody,
	CheckboxControl,
} from '@wordpress/components';

import metadata from './block.json';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'bb-accordion-block',
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls key="setting">
				<Panel>
					<PanelRow>
						<PanelBody>
							<CheckboxControl
								label="Open on page load"
								checked={attributes.openOnPageLoad}
								onChange={newValue => setAttributes({ openOnPageLoad: newValue })}
							></CheckboxControl>
						</PanelBody>
					</PanelRow>
					
				</Panel>
			</InspectorControls>
			<BlockControls group="block">
				<AlignmentControl value={align} onChange={onChangeAlign} />
			</BlockControls>
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
		</div>
	);
}
