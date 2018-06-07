import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';

import bemify from '../util/bemify';
import BigRadioButton from './bigRadioButton';
import TimeDropdown from './timeDropdown';

import {
  setStorageAmount,
  setUploadSpeed,
  setReason,
  setUptimeStart,
  setUptimeEnd,
  toggleAllDayUptime,
} from '../state/expectedUsage';

const bem = bemify('expectedUsage');

// TODO: show storage?
const useStorage = false;

const textareaPlaceholder = 'e.g. By using Gladius for a few hours I can finally put my network to good use. I plan to minimize its cost by renting my spare network bandwidth.';

export function ExpectedUsage({
  disableTimeDropdown,
  allDayValue,
  uptimeStartValue,
  uptimeEndValue,
  reason,
  storageAmount,
  uploadSpeed,
  setStorageAmount,
  setUploadSpeed,
  setUptimeStart,
  setUptimeEnd,
  setReason,
  toggleAllDayUptime,
}) {
  let storageSlider = null;
  if (useStorage) {
    storageSlider = (
      <div className="col-12 mb-5">
        <div className="upload-speed-container mb-3">
          <span>Storage Amount</span>
          <span className="upload-speed">{storageAmount} Mb</span>
        </div>
        <div className="slider-container">
          <ReactSlider
            defaultValue={storageAmount}
            handleClassName="slider-handle"
            withBars
            max={4000}
            onChange={setStorageAmount} />
        </div>
      </div>
    );
  }
  return (
    <div className={classnames(bem())}>
      <div className="col-12 mb-5">
        <div className="upload-speed-container mb-3">
          <span>Upload Speed</span>
          <span className="upload-speed">{uploadSpeed}.0 Mbps</span>
        </div>
        <div className="slider-container">
          <ReactSlider
            defaultValue={uploadSpeed}
            handleClassName="slider-handle"
            withBars
            max={1000}
            onChange={setUploadSpeed} />
        </div>
      </div>
      {storageSlider}
      <div className="col-12 mb-5">
        <span className="mr-4">Daily Uptime</span>
        <TimeDropdown
          value={uptimeStartValue}
          disabled={disableTimeDropdown}
          onChange={setUptimeStart} />
        <span className="ml-2 mr-2">—</span>
        <TimeDropdown
          value={uptimeEndValue}
          className="mr-4"
          disabled={disableTimeDropdown}
          onChange={setUptimeEnd} />
        <span className="all-day-container pl-4">
          <BigRadioButton
            isCheckbox={true}
            on={allDayValue}
            className="mr-2"
            onClick={toggleAllDayUptime} />
          All Day
        </span>
      </div>
      <div className="col-12">
        <div className="mb-2">Tell us why you want to join us</div>
        <textarea
          className="p-2"
          placeholder={textareaPlaceholder}
          value={reason}
          onChange={setReason} />
      </div>
    </div>
  );
}

ExpectedUsage.propTypes = {
  disableTimeDropdown: PropTypes.bool,
  allDayValue: PropTypes.bool,
  uptimeStartValue: PropTypes.number,
  uptimeEndValue: PropTypes.number,
  reason: PropTypes.string,
  uploadSpeed: PropTypes.number,
  setUploadSpeed: PropTypes.func,
  setUptimeStart: PropTypes.func,
  setUptimeEnd: PropTypes.func,
  setReason: PropTypes.func,
  toggleAllDayUptime: PropTypes.func,
};

function mapStateToProps(state) {
  let { expectedUsage } = state;
  return {
    disableTimeDropdown: expectedUsage.allDayUptime,
    allDayValue: expectedUsage.allDayUptime,
    uptimeStartValue: expectedUsage.uptimeStart,
    uptimeEndValue: expectedUsage.uptimeEnd,
    reason: expectedUsage.reason,
    storageAmount: expectedUsage.storageAmount,
    uploadSpeed: expectedUsage.uploadSpeed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUploadSpeed: speed => dispatch(setUploadSpeed(speed)),
    setStorageAmount: storageAmount => dispatch(setStorageAmount(storageAmount)),
    setUptimeStart: uptimeStart => dispatch(setUptimeStart(uptimeStart)),
    setUptimeEnd: uptimeEnd => dispatch(setUptimeEnd(uptimeEnd)),
    setReason: textEvent => dispatch(setReason(textEvent.target.value)),
    toggleAllDayUptime: () => dispatch(toggleAllDayUptime()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpectedUsage);
