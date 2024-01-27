import { useField } from 'formik';
import { FormLabel  } from '@chakra-ui/react';
import React from 'react';
import '../css/style.css';

const TextInputLiveFeedback = ({ label, helpText,innerRef,component: Component, ...props }) => {    
    const [field, meta] = useField(props);  
    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =    
      (!!didFocus && field.value.trim().length > 2) || meta.touched;
  
    return (
      <div
        className={`form-control ${
          showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
        }`}
      >
        <div className="flex items-center space-between">
          <FormLabel htmlFor={props.id}>{label}</FormLabel>{' '}
          {showFeedback ? (
            <div
              id={`${props.id}-feedback`}
              aria-live="polite"
              className="feedback text-sm"
            >
              {meta.error ? meta.error : '✓'}
            </div>
          ) : null}
        </div>
        <Component
          {...props}
          {...field}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}     
          ref={innerRef}     
          autoComplete="off"
        />
        <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
          {helpText}
        </div>
      </div>
    );
  };

  export default TextInputLiveFeedback;