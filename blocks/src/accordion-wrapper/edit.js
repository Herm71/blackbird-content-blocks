
import { __ } from '@wordpress/i18n';

import { 
	useBlockProps, 
	InnerBlocks
} from '@wordpress/block-editor';

import './editor.scss';
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'blackbird-accordion-wrapper',
	} );

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks />
			</div>
		</>
	);
}
