import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { ReactComponent as IconClose } from "assets/images/icon/ic_close.svg";
import { ReactComponent as IconPlus } from "assets/images/icon/ic_plus.svg";
import { useState } from "react";
import console from "console";

export interface DropZoneProps {
	maxFiles?: number;
	onChangeEvent: (acceptedFiles: File[]) => void;
}

const DropZone = (props: DropZoneProps) => {
	const { maxFiles, onChangeEvent } = props;
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/png": [".png", ".jpg", ".jepg"],
		},
		maxFiles: maxFiles,
		onDrop: (acceptedFiles) => onChangeEvent(acceptedFiles),
	});
	const [imageSelected, setImageSelected] = useState(0);

	const handleSelectImage = (index: number) => setImageSelected(index);

	return (
		<div
			className={classNames(
				"dropzone_wrap",
				acceptedFiles.length > 0 && "has_img"
			)}
		>
			<ul className="dropzone_list">
				{acceptedFiles.length > 0 &&
					acceptedFiles.map((file, index) => {
						return (
							<li
								className={classNames(
									"dropzone_img",
									index === imageSelected && "is_active"
								)}
								key={index}
							>
								<button
									type="button"
									className="dropzone_btn"
									onClick={() => handleSelectImage(index)}
								></button>
								<img src={URL.createObjectURL(file)} alt="" />
								<button type="button" className="btn_remove_img">
									<IconClose width={30} height={30} />
								</button>
							</li>
						);
					})}
				<li {...getRootProps({ className: "dropzone" })}>
					<input
						{...getInputProps()}
						// onChange={() => console.log(123)}
						className="dropzone_inp"
					/>
					<p className="dropzone_text">
						Drag and drop files here, or click to select files
					</p>
					<IconPlus width={50} height={50} className="icon_plus" />
				</li>
			</ul>
			{acceptedFiles.length > 0 && (
				<div className="dropzone_show">
					{acceptedFiles.map((file, index) => {
						if (index === imageSelected) {
							return <img key={index} src={URL.createObjectURL(file)} alt="" />;
						}
					})}
				</div>
			)}
		</div>
	);
};

export default DropZone;
