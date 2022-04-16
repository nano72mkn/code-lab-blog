import path from 'path';

import { Canvas, GlobalFonts } from '@napi-rs/canvas';

import type { NextApiRequest, NextApiResponse } from 'next';

const OgpCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    GlobalFonts.registerFromPath(
      path.resolve('./public/fonts/NotoSansJP.otf'),
      'NotoSansJP',
    );

    const width = 1200 as const;
    const height = 630 as const;
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    // 背景
    ctx.fillStyle = '#FFB900';
    ctx.fillRect(0, 0, width, height);

    // inner
    const innerX = 30;
    const innerY = 30;
    const innerWidth = width - innerX * 2;
    const innerHeight = height - innerY * 2;
    const innerRound = 10;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(innerX, innerY + innerRound);
    ctx.arc(
      innerY + innerRound,
      innerY + innerHeight - innerRound,
      innerRound,
      Math.PI,
      Math.PI * 0.5,
      true,
    );
    ctx.arc(
      innerY + innerWidth - innerRound,
      innerY + innerHeight - innerRound,
      innerRound,
      Math.PI * 0.5,
      0,
      true,
    );
    ctx.arc(
      innerY + innerWidth - innerRound,
      innerY + innerRound,
      innerRound,
      0,
      Math.PI * 1.5,
      true,
    );
    ctx.arc(
      innerY + innerRound,
      innerY + innerRound,
      innerRound,
      Math.PI * 1.5,
      Math.PI,
      true,
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // タイトル
    const fontSize = 50;
    const title = req.query.title;
    ctx.font = `${fontSize}px NotoSansJP`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (title) {
      const lines: string[] = [];

      Array.from(title).forEach((v) => {
        if (
          lines.length &&
          ctx.measureText(lines[lines.length - 1]).width < innerWidth - 100
        ) {
          lines[lines.length - 1] += v;
        } else {
          lines.push(v);
        }
      });

      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          width / 2,
          height / 2 -
            (lines.length - 1) * fontSize +
            fontSize * (i + 1) -
            fontSize,
        );
      });
    }

    // 署名
    ctx.font = `30px NotoSansJP`;
    ctx.fillText('@shota1995m', width - 11 * 14, height - 35 - innerX);
    // 変換
    const buffer = canvas.toBuffer('image/png');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });
    res.end(buffer, 'binary');
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Internal Server Error');
  }
};

export default OgpCard;
