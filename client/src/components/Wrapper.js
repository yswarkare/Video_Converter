import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadVideo,
    setOutputSize,
    convertVideo,
    downloadVideo,
    changeUpdatingStatus,
    changeConvertingStatus,
    changeUploadedStatus,
    changeConvertedStatus } from "../redux/actions/primary_actions";


class Wrapper extends Component {

    componentDidMount = () => {
        this.props.changeUpdatingStatus(false);
        this.props.changeConvertingStatus(false);
        this.props.changeUploadedStatus(false);
        this.props.changeConvertedStatus(false);
    }

    onClickChooseFile = async (files_01) => {
        let files = [...files_01];
        this.props.uploadVideo(files[0]);
    }

    onChangeSetOutputSize = (size) => {
        this.props.setOutputSize(size);
    }

    onClickConvertVideo = () => {
        let fileInfo = {
            filename: this.props.state01.newFilename,
            size: this.props.state01.size
        }
        this.props.convertVideo(fileInfo);
    }

    onClickDownloadVideo = () => {
        let fileInfo = {
            filename: this.props.state01.newFilename,
            size: this.props.state01.size
        }
        this.props.downloadVideo(fileInfo);
    }

    render () {
        return (
            <div className="wrapper">
                <div className="wrapper-header">
                    <h4>Resize mp4 video</h4>
                </div>
                <div className="file-input-form">
                    <div className="form-items">
                        <label className="form-sub-item-1">Select a file to resize</label>
                        <input
                        className="form-sub-item-2"
                        placeholder="Choose a file"
                        onChange={(e)=>{this.onClickChooseFile(e.target.files)}}
                        type="file"
                        />
                    </div>
                    <div>
                        {
                            this.props.state01.uploadingStatus === true &&                             
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        {
                            this.props.state01.uploadedStatus === true &&
                            <span>Video succesfully uploaded</span>
                        }
                    </div>
                    <div className="form-items">
                        <label className="form-sub-item-1">Choose size</label>
                        <select className="form-sub-item-2"
                         onChange={(e)=>{this.onChangeSetOutputSize(e.target.value)}}>
                            <option value="1080">1080p</option>
                            <option value="720">720p</option>
                            <option value="480">480p</option>
                            <option value="360">360p</option>
                            <option value="240">240p</option>
                            <option value="144">144p</option>
                        </select>
                    </div>
                    <div className="form-items">
                        <label className="form-sub-item-1">Start converting video</label>
                        <button className="form-sub-item-2 w-50" type="button"
                        onClick={()=>{this.onClickConvertVideo()}}>
                            {
                                this.props.state01.convertingStatus === false &&
                                <span className="button-text">Convert</span>
                            }
                            {
                                this.props.state01.convertingStatus === true &&
                                <Fragment>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Loading...</span>
                                </Fragment>
                            }
                        </button>
                    </div>
                    <div>
                        {
                            this.props.state01.convertedStatus === true &&
                            <span>Video successfully converted you can download it now</span>
                        }
                    </div>
                    <div className="form-items">
                        <label className="form-sub-item-1">Download Converted Video</label>
                        <button className="form-sub-item-2 w-50"
                        onClick={()=>{this.onClickDownloadVideo()}}
                        target="_blank" download>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        )

    }
}

Wrapper.propTypes = {
    state01: PropTypes.object.isRequired,
    uploadVideo: PropTypes.func.isRequired,
    setOutputSize: PropTypes.func.isRequired,
    convertVideo: PropTypes.func.isRequired,
    downloadVideo: PropTypes.func.isRequired,
    changeUpdatingStatus: PropTypes.func.isRequired,
    changeConvertingStatus: PropTypes.func.isRequired,
    changeUploadedStatus: PropTypes.func.isRequired,
    changeConvertedStatus: PropTypes.func.isRequired
}

const mapStateToPorps = (state) => {
    return {
        state01: state.state01
    }
}

const mapDispatchToProps = {
    uploadVideo,
    setOutputSize,
    convertVideo,
    downloadVideo,
    changeUpdatingStatus,
    changeConvertingStatus,
    changeUploadedStatus,
    changeConvertedStatus
}

export default connect(mapStateToPorps, mapDispatchToProps)(Wrapper);