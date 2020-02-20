import React from 'react';

const options = [
  {
    title: 'JavaScript',
    name: 'javascript'
  },
  {
    title: 'Python',
    name: 'python'
  },
  {
    title: 'Ruby',
    name: 'ruby'
  },
  {
    title: 'Go',
    name: 'go'
  }
];

function Languages({ language, setLanguage }) {
  return (
    <>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value=''>Select Language</option>
        {
          options.map(option => <option value={option.name} key={option.name}>{option.title}</option>)
        }
      </select>
    </>
  );
}

export default Languages;