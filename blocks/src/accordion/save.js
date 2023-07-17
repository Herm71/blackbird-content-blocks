
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
	});
	const innerBlocksProps = useInnerBlocksProps.save();
	const { title } = attributes;


	return (
		<details {...blockProps} >
			<summary>
				<input

					value={title}
					style={{ "width": "100%" }}
					aria-label={__('Summary text')}

				/>
		</summary>
		<div {...innerBlocksProps} />
		</details>
	);
}
