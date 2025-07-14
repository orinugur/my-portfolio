const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/comments', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId 쿼리 파라미터가 필요합니다.' });
  }
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2' });

    // 댓글 영역까지 스크롤
    // 댓글 영역이 나타날 때까지 스크롤 및 대기 반복
    let found = false;
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      try {
        await page.waitForSelector('ytd-comment-thread-renderer', { timeout: 1500 });
        found = true;
        break;
      } catch (e) {
        // 계속 스크롤
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    let comments = [];
    if (found) {
      comments = await page.evaluate(() => {
        const threads = Array.from(document.querySelectorAll('ytd-comment-thread-renderer'));
        return threads.slice(0, 30).map((el, i) => ({
          commentId: i + 1,
          authorName: el.querySelector('#author-text span')?.textContent.trim() || '',
          text: el.querySelector('#content-text')?.textContent.trim() || '',
          publishedTimeText: el.querySelector('.published-time-text a')?.textContent.trim() || '',
        }));
      });
    }

    res.json({ comments });
  } catch (err) {
    console.error('puppeteer 댓글 크롤링 오류:', err.message, err.stack);
    res.status(500).json({ error: '댓글을 가져오는 중 오류가 발생했습니다.', detail: err.message, stack: err.stack });
  } finally {
    if (browser) await browser.close();
  }
});

// (임시) 영상 정보 API는 주석 처리 또는 삭제 가능
/*
app.get('/api/info', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId 쿼리 파라미터가 필요합니다.' });
  }
  try {
    const yt = await new Innertube();
    const info = await yt.getInfo(videoId);
    res.json({ info });
  } catch (err) {
    console.error('getInfo 오류:', err.message, err.stack);
    res.status(500).json({ error: '영상 정보를 가져오는 중 오류가 발생했습니다.', detail: err.message, stack: err.stack });
  }
});
*/

app.listen(PORT, () => {
  console.log(`YouTube 댓글 API 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});