
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
	});
	const innerBlocksProps = useInnerBlocksProps.save();
	const { title } = attributes;


	return (
		<details {...blockProps}>
				<RichText.Content
					tagName="summary"
					value={title}
				/>
			<div {...innerBlocksProps} />
		</details>
	);
}
