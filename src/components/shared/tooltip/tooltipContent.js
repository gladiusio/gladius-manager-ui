/* eslint-disable react/no-unused-prop-types,react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import bemify from '../../../util/bemify';
import noop from '../../../util/noop';

const bem = bemify('gladius-tooltip-content');

function renderFooter(props) {
  if (props.noFooter) {
    return null;
  }

  return (
    <div className={bem('footer')}>
      <div className="row">
        {
          props.cancelText
            ?
            (
              <div className="col">
                <button
                  className={classnames(bem('cancel-button'), 'btn btn-link')}
                  onClick={props.onCancel}
                >
                  {props.cancelText}
                </button>
              </div>
            )
            :
            null
        }
        {
          props.submitText
            ?
            (
              <div className="col text-right">
                <button
                  className={classnames(bem('submit-button'), 'btn btn-link')}
                  onClick={props.onSubmit}
                  disabled={props.disableSubmit}
                >
                  {props.submitText}
                </button>
              </div>
            )
            :
            null
        }
      </div>
    </div>
  );
}

export default function TooltipContent(props) {
  return (
    <div className={bem()}>
      <div className={classnames(bem('content'), { [bem('content', 'no-padding')]: props.noPadding })}>
        {props.children}
      </div>
      {renderFooter(props)}
    </div>
  );
}

TooltipContent.defaultProps = {
  noFooter: false,
  noPadding: false,
  submitText: 'Submit',
  cancelText: 'Cancel',
  disableSubmit: false,
  onSubmit: noop,
  onCancel: noop,
};

TooltipContent.propTypes = {
  noFooter: PropTypes.bool,
  noPadding: PropTypes.bool,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  disableSubmit: PropTypes.bool,
};
