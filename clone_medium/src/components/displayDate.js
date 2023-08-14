

function DisplayDate({ publishedAt }) {
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  
    return <>{formattedDate}</>;
  }

  export default DisplayDate