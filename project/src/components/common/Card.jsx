import PropTypes from 'prop-types';

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card; 