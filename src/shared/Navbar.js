import React from 'react'

export default function Navbar () {
  const languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript',
  }, {
    name: 'Ruby',
    param: 'ruby',
  }, {
    name: 'Python',
    param: 'python',
  }, {
    name: 'Java',
    param: 'java',
  }]

  return (
    <ul>
      {languages.map(({ name, param }) => (
        <li key={param}>
          <a href={`/popular/${param}`}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  )
}