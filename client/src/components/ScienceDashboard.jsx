import Carousel from './Carousel';
import './ScienceDashboard.css';

const ScienceDashboard = () => {
  return (
    <div className="statsDashboard">
      <div className="statItem">
        <p>Total Publications</p>
        <p>125</p>
      </div>
      <div className="statItem">
        <p>h-index</p>
        <p>42</p>
      </div>
      <div className="statItem">
        <p>Citations</p>
        <p>10,234</p>
      </div>
      <div className="statItem">
        <a href="https://orcid.org/0000-0001-2345-6789" target="_blank" rel="noopener noreferrer">ORCID</a>
      </div>
      <div className="statItem">
        <a href="https://www.labwebsite.com" target="_blank" rel="noopener noreferrer">Lab Website</a>
      </div>
      <div className="statItem">
        <a href="https://pubmed.ncbi.nlm.nih.gov/?term=author+name" target="_blank" rel="noopener noreferrer">PubMed References</a>
      </div>
    </div>
  );
};

export default ScienceDashboard