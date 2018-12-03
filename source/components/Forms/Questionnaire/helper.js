import React from 'react';

export const DisplayFormikState = (props) => (
    <div style = {{ margin: '1rem 0' }}>
        <h3 style = {{ fontFamily: 'monospace' }} />
        <pre
            style = {{
                background: '#f6f8fa',
                fontSize:   '.65rem',
                padding:    '.5rem',
            }}>
            <strong>props</strong> ={' '}
            {JSON.stringify(props, null, 2)}
        </pre>
    </div>
);

export const MoreResources = (props) => (
    <div>
        <hr style = {{ margin: '3rem 0' }} />
        <h3>More Examples</h3>
        <ul>
            <li>
                <a
                    href = 'https://codesandbox.io/s/q8yRqQMp'
                    rel = 'noopener'
                    target = '_blank'>
          Synchronous validation
                </a>
            </li>
            <li>
                <a
                    href = 'https://codesandbox.io/s/qJR4ykJk'
                    rel = 'noopener'
                    target = '_blank'>
          Building your own custom inputs
                </a>
            </li>
            <li>
                <a
                    href = 'https://codesandbox.io/s/jRzE53pqR'
                    rel = 'noopener'
                    target = '_blank'>
          3rd-party input components: React-select
                </a>
            </li>
            <li>
                <a
                    href = 'https://codesandbox.io/s/QW1rqjBLl'
                    rel = 'noopener'
                    target = '_blank'>
          3rd-party input components: Draft.js
                </a>
            </li>
            <li>
                <a
                    href = 'https://codesandbox.io/s/pgD4DLypy'
                    rel = 'noopener'
                    target = '_blank'>
          Accessing Lifecyle Methods (resetting a form
          externally)
                </a>
            </li>
        </ul>
        <h3 style = {{ marginTop: '1rem' }}>
      Additional Resources
        </h3>
        <ul>
            <li>
                <a
                    href = 'https://github.com/jaredpalmer/formik'
                    rel = 'noopener'
                    target = '_blank'>
          GitHub Repo
                </a>
            </li>
            <li>
                <a
                    href = 'https://github.com/jaredpalmer/formik/issues'
                    rel = 'noopener'
                    target = '_blank'>
          Issues
                </a>
            </li>
            <li>
                <a
                    href = 'https://twitter.com/jaredpalmer'
                    rel = 'noopener'
                    target = '_blank'>
          Twitter (@jaredpalmer)
                </a>
            </li>
        </ul>
    </div>
);
