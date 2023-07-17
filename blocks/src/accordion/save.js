
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
	});
	const innerBlocksProps = useInnerBlocksProps.save();
	const { title, showInnerBlocks } = attributes;


	return (
		<details {...blockProps} open={showInnerBlocks}>
				<summary>
					<RichText.Content

						value={title}
					/>
				</summary>
			<div {...innerBlocksProps} />
		</details>
	);
}
