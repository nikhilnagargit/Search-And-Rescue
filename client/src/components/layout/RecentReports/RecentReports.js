import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';

import './RecentReports.scss';

const RecentReports = () => {
  return (
    <div className='recent-container'>
      <div className='heading'>
        <h4>Recent Missing Flights</h4>
        {/* this link is from material , not from router */}
        <div className='show_all'>
          {' '}
          <Link href='#'>Show All</Link>
        </div>
      </div>
      <div className='cards-section'>
        <Card className='card'>
          <p>Flight Mark-D 12</p>

          <div className='bottom'>
            <IconButton aria-label='rescue'>
              <i className='fas fa-paper-plane fa-sm'></i>
            </IconButton>
            <IconButton aria-label='delete'>
              <i className='fas fa-trash fa-sm'></i>
            </IconButton>
          </div>
        </Card>
        <Card className='card'>
          <p>Flight Mark-D 12</p>

          <div className='bottom'>
            <IconButton aria-label='rescue'>
              <i className='fas fa-paper-plane fa-sm'></i>
            </IconButton>
            <IconButton aria-label='delete'>
              <i className='fas fa-trash fa-sm'></i>
            </IconButton>
          </div>
        </Card>
        <Card className='card'>
          <p>Flight Mark-D 12</p>

          <div className='bottom'>
            <IconButton aria-label='rescue'>
              <i className='fas fa-paper-plane fa-sm'></i>
            </IconButton>
            <IconButton aria-label='delete'>
              <i className='fas fa-trash fa-sm'></i>
            </IconButton>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecentReports;
