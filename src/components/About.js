import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='about'>
      <h4>version 1.0.0</h4>
      <p>
        This is task tracker application that track and update your task to help
        keep track of your task or event
      </p>
      <Link to='/'>Add task</Link>
    </div>
  );
};

export default About;
