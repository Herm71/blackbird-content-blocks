
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
	});
	
	const { title } = attributes;


	return (
		<details {...blockProps}>
				<RichText.Content
					tagName="summary"
					value={title}
				/>
			<InnerBlocks />
		</details>
	);
}
