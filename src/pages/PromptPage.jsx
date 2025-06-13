import GamifiedProgress from '../components/GamifiedProgress';
import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // 🗣️ Voice import

const PromptPage = () => {
  const [text, setText] = useState('');
  const [corrections, setCorrections] = useState([]);
  const [appliedFixes, setAppliedFixes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🗣️ Voice setup
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleVoiceStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleVoiceStop = () => {
    SpeechRecognition.stopListening();
    setText(prev => prev + ' ' + transcript);
    resetTranscript();
  };

  const handleCheckGrammar = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.languagetoolplus.com/v2/check', null, {
        params: {
          text,
          language: 'en-US',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setCorrections(response.data.matches);
      setAppliedFixes([]);
    } catch (error) {
      console.error('Grammar check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCorrection = (index) => {
    const match = corrections[index];
    const replacement = match.selected || match.replacements[0].value;
    const before = text.slice(0, match.offset);
    const after = text.slice(match.offset + match.length);
    const newText = before + replacement + after;

    const applied = {
      offset: match.offset,
      length: replacement.length,
      original: text.slice(match.offset, match.offset + match.length),
      replacement,
    };

    setText(newText);
    setAppliedFixes([...appliedFixes, applied]);
    setCorrections(corrections.filter((_, i) => i !== index));
  };

  const handleUndo = (fixIndex) => {
    const fix = appliedFixes[fixIndex];
    const before = text.slice(0, fix.offset);
    const after = text.slice(fix.offset + fix.length);
    setText(before + fix.original + after);
    setAppliedFixes(appliedFixes.filter((_, i) => i !== fixIndex));
  };

  const highlightText = () => {
    let highlighted = '';
    let lastIndex = 0;
    corrections.forEach((match) => {
      const start = match.offset;
      const end = match.offset + match.length;
      highlighted += text.slice(lastIndex, start);
      highlighted += `<mark style="background: yellow;">${text.slice(start, end)}</mark>`;
      lastIndex = end;
    });
    highlighted += text.slice(lastIndex);
    return { __html: highlighted };
  };

  return (
    <div>
      <GamifiedProgress />
      <h2>Grammar Checker</h2>

      <textarea
        rows="6"
        cols="60"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or speak here..."
      ></textarea>

      <br />
      {/* 🗣️ Voice Buttons */}
      <button onClick={handleVoiceStart} disabled={listening}>
        🎙️ Start Speaking
      </button>
      <button onClick={handleVoiceStop} disabled={!listening} style={{ marginLeft: '8px' }}>
        🛑 Stop & Insert
      </button>

      <br /><br />
      <button onClick={handleCheckGrammar} disabled={loading}>
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>

      {corrections.length > 0 && <h3>Suggestions:</h3>}
      <ul>
        {corrections.map((match, index) => (
          <li key={index}>
            <strong>Issue:</strong> {match.message}<br />
            <strong>Suggestions:</strong>
            <select
              onChange={(e) => {
                const newCorrections = [...corrections];
                newCorrections[index].selected = e.target.value;
                setCorrections(newCorrections);
              }}
              defaultValue={match.replacements[0]?.value}
            >
              {match.replacements.map((r, i) => (
                <option key={i} value={r.value}>
                  {r.value}
                </option>
              ))}
            </select>
            <br />
            <button onClick={() => handleApplyCorrection(index)}>Apply</button>
            <hr />
          </li>
        ))}
      </ul>

      {appliedFixes.length > 0 && (
        <>
          <h3>Undo Corrections:</h3>
          <ul>
            {appliedFixes.map((fix, i) => (
              <li key={i}>
                Replaced "<strong>{fix.original}</strong>" with "<strong>{fix.replacement}</strong>"
                <button onClick={() => handleUndo(i)} style={{ marginLeft: '10px' }}>Undo</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {corrections.length > 0 && (
        <>
          <h3>Highlighted Issues (Read-only Preview)</h3>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              background: '#f9f9f9',
              whiteSpace: 'pre-wrap',
              marginTop: '10px'
            }}
            dangerouslySetInnerHTML={highlightText()}
          ></div>
        </>
      )}
    </div>
  );
};

export default PromptPage;
