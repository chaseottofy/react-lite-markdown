import { useState } from "react";
import PropTypes from 'prop-types';
import "../../styles/Tooltip.css";
/**
 * Tooltip
 * @param {string} content 
 * @param {React.element} children
 * @param {string} position "top", "left", "right", "bottom"
 * @param {number} delay milliseconds (already has 100ms transition delay)
 * @description Wrap single child element with tooltip to display on hover and focus
 */
const Tooltip = (
  {
    content,
    children,
    position = 'bottom',
    delay = 0,
    height = 24,
  }
) => {

  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translate(-75%, -8%)',
          height: `${height}px`,
        };
      case 'top-left':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translate(-75%, -8%)',
          height: `${height}px`,
        };
      case 'left':
        return {
          top: '50%',
          right: '100%',
          transform: 'translate(-10%, -50%)',
          height: `${height}px`,
        };
      case 'right':
        return {
          top: '50%',
          left: '90%',
          transform: 'translateY(-50%)',
          height: `${height}px`,
        };
      case 'bottom':
      default:
        return {
          top: '100%',
          left: '50%',
          transform: "translate(-50%, 75%)",
          height: `${height}px`,
        };
    }
  };

  const tooltipStyle = {
    ...getPositionStyle(),
    visibility: isVisible ? 'visible' : 'hidden',
  };

  const handleMouseEnter = () => showTooltip();
  const handleMouseLeave = () => hideTooltip();

  return (
    <div className="tooltip-container">
      <div
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </div>
      <div className={`tooltip ${position}`} style={tooltipStyle}>
        {content}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
  delay: PropTypes.number,
  height: PropTypes.number,
};

/**
 * example
 * <Tooltip content="Hello World">
 *  <button>Hover Me</button>
 * </Tooltip>
 * 
 * 
 */

export default Tooltip;
