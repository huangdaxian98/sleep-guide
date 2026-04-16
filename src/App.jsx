import { useState } from "react";

const questions = [
  {
    id: "state",
    text: "现在脑子里是什么状态？",
    options: [
      { label: "转个不停，停不下来", value: "busy" },
      { label: "空空的，就是睡不着", value: "empty" },
      { label: "情绪有点低，需要陪伴", value: "low" },
    ],
  },
  {
    id: "sound",
    text: "对声音的感觉？",
    options: [
      { label: "越安静越好，声音是干扰", value: "quiet" },
      { label: "需要点背景音，填满空白", value: "background" },
      { label: "想有人说话，有点声音陪着", value: "voice" },
    ],
  },
];

const results = {
  busy_quiet: {
    title: "棕噪音",
    desc: "比白噪音更低沉，像海浪在远处。能遮住脑子里的杂音，不会让你去听它。",
    links: [
      { name: "Spotify · Brown Noise Sleep", url: "https://open.spotify.com/search/brown%20noise%20sleep" },
      { name: "YouTube 搜索", url: "https://www.youtube.com/results?search_query=brown+noise+sleep" },
    ],
  },
  busy_background: {
    title: "Lo-fi Hip Hop",
    desc: "节奏慢、没有歌词、音量稳定。给脑子一个轻的东西抓着，反而容易放松下来。",
    links: [
      { name: "Spotify · lofi sleep", url: "https://open.spotify.com/search/lofi%20sleep" },
      { name: "YouTube · Lofi Girl", url: "https://www.youtube.com/c/LofiGirl" },
    ],
  },
  busy_voice: {
    title: "无聊话题播客",
    desc: "选一个你完全不感兴趣的话题，让声音分散注意力。脑子跟着那边走，慢慢就停了。",
    links: [
      { name: "喜马拉雅 · 助眠广播", url: "https://www.ximalaya.com/search?q=%E5%8A%A9%E7%9C%A0%E5%B9%BF%E6%92%AD" },
    ],
  },
  empty_quiet: {
    title: "雨声",
    desc: "最纯粹的空白填充物。不需要去听，它只是在那里。推荐加上轻微的雷声版本。",
    links: [
      { name: "YouTube 搜索", url: "https://www.youtube.com/results?search_query=rain+thunder+sleep" },
      { name: "Spotify · Rain Sleep", url: "https://open.spotify.com/search/rain%20sleep" },
    ],
  },
  empty_background: {
    title: "Ambient / 环境音乐",
    desc: "Brian Eno 那类没有旋律中心的音乐。有质感，但不会让你跟着走。像水一样流过。",
    links: [
      { name: "Spotify · Ambient Sleep", url: "https://open.spotify.com/search/ambient%20sleep" },
      { name: "YouTube 搜索", url: "https://www.youtube.com/results?search_query=ambient+music+sleep" },
    ],
  },
  empty_voice: {
    title: "有声睡眠故事",
    desc: "语速极慢、内容平静的故事朗读。不是要你听完，就是让声音托着你。",
    links: [
      { name: "喜马拉雅 · 睡眠故事", url: "https://www.ximalaya.com/search?q=%E7%9D%A1%E7%9C%A0%E6%95%85%E4%BA%8B" },
    ],
  },
  low_quiet: {
    title: "钢琴 · 慢板",
    desc: "Satie 的 Gymnopédies 或类似的独奏钢琴。有情绪但不沉重，像远处有人在陪着。",
    links: [
      { name: "Spotify · Satie Gymnopédies", url: "https://open.spotify.com/search/satie%20gymnopedie" },
      { name: "YouTube 搜索", url: "https://www.youtube.com/results?search_query=satie+gymnopedie+sleep" },
    ],
  },
  low_background: {
    title: "夜间城市白噪音",
    desc: "远处的车声、空调声、偶尔的人声。像窗外的世界还在，但不用你去管它。",
    links: [
      { name: "YouTube 搜索", url: "https://www.youtube.com/results?search_query=city+night+ambience+sleep" },
    ],
  },
  low_voice: {
    title: "情感类有声书 / 广播剧",
    desc: "有温度、节奏不紧的内容。声音里有人，你不是一个人在熬夜。",
    links: [
      { name: "喜马拉雅 · 广播剧", url: "https://www.ximalaya.com/search?q=%E5%B9%BF%E6%92%AD%E5%89%A7" },
      { name: "网易云 · 睡前故事", url: "https://music.163.com/#/search/m/?s=睡前故事&type=1009" },
    ],
  },
};

export default function SleepSelector() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const currentQ = questions[step];

  function choose(qid, val) {
    const next = { ...answers, [qid]: val };
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const resultKey = done ? `${answers.state}_${answers.sound}` : null;
  const result = resultKey ? results[resultKey] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a12",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', 'Noto Serif SC', serif",
      padding: "24px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        color: "#e8e4dc",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#5a5572", marginBottom: 12, textTransform: "uppercase" }}>
            凌晨 · 睡眠引导
          </div>
          <div style={{ width: 40, height: 1, background: "#2a2640", margin: "0 auto" }} />
        </div>

        {!done ? (
          <div>
            {/* Progress */}
            <div style={{ display: "flex", gap: 6, marginBottom: 40, justifyContent: "center" }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  width: i <= step ? 24 : 8,
                  height: 3,
                  borderRadius: 2,
                  background: i <= step ? "#7b6fa0" : "#1e1c2e",
                  transition: "all 0.4s ease",
                }} />
              ))}
            </div>

            {/* Question */}
            <div style={{
              fontSize: 20,
              lineHeight: 1.6,
              marginBottom: 36,
              color: "#ccc8bc",
              textAlign: "center",
              fontWeight: "normal",
            }}>
              {currentQ.text}
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => choose(currentQ.id, opt.value)}
                  style={{
                    background: "transparent",
                    border: "1px solid #2a2640",
                    borderRadius: 12,
                    padding: "16px 20px",
                    color: "#b8b4ac",
                    fontSize: 15,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#7b6fa0";
                    e.currentTarget.style.color = "#e8e4dc";
                    e.currentTarget.style.background = "#13111e";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#2a2640";
                    e.currentTarget.style.color = "#b8b4ac";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div style={{ animation: "fadeIn 0.6s ease" }}>
            {/* Result */}
            <div style={{
              background: "#0f0d1a",
              border: "1px solid #2a2640",
              borderRadius: 16,
              padding: "32px 28px",
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "#5a5572", marginBottom: 16, textTransform: "uppercase" }}>
                推荐给你
              </div>
              <div style={{ fontSize: 26, color: "#e0dbd0", marginBottom: 16, fontWeight: "normal" }}>
                {result.title}
              </div>
              <div style={{ fontSize: 14, color: "#8a8680", lineHeight: 1.8 }}>
                {result.desc}
              </div>
            </div>

            {/* Links */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#3a3650", marginBottom: 12, textTransform: "uppercase" }}>
                去哪里找
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {result.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      background: "#0f0d1a",
                      border: "1px solid #2a2640",
                      borderRadius: 8,
                      color: "#7b6fa0",
                      fontSize: 13,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#7b6fa0";
                      e.currentTarget.style.color = "#a89fcc";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "#2a2640";
                      e.currentTarget.style.color = "#7b6fa0";
                    }}
                  >
                    → {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div style={{
              fontSize: 12,
              color: "#3a3650",
              lineHeight: 1.8,
              marginBottom: 32,
              padding: "0 4px",
            }}>
              小提示：定个 30 分钟睡眠定时器，音量调到刚好能听见。不用刻意去听，让它做背景。
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              style={{
                background: "transparent",
                border: "none",
                color: "#3a3650",
                fontSize: 12,
                cursor: "pointer",
                padding: 0,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#5a5572"}
              onMouseLeave={e => e.currentTarget.style.color = "#3a3650"}
            >
              ← 重新选
            </button>
          </div>
        ) : null}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
