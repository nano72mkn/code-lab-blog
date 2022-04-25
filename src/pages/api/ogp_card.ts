import path from 'path';

import { Canvas, GlobalFonts } from '@napi-rs/canvas';

import type { NextApiRequest, NextApiResponse } from 'next';

const OgpCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    GlobalFonts.registerFromPath(
      path.resolve('./public/fonts/MPLUSRounded1c-Bold.ttf'),
      'MPLUSRounded1c',
    );

    GlobalFonts.registerFromPath(
      path.resolve('./public/fonts/MPLUSRounded1c-Regular.ttf'),
      'MPLUSRounded1c',
    );

    console.info(
      GlobalFonts.families
        .map((f) =>
          f.family === 'MPLUSRounded1c' || f.family === 'Murecho'
            ? f.styles.map((s) => `${f.family} ${s.style}`).join(', ')
            : null,
        )
        .filter(Boolean),
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
    const fontSize = 80;
    const title = req.query.title;
    const maxLine = 3;
    ctx.font = `500 ${fontSize}px MPLUSRounded1c`;
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (title) {
      const lines: string[] = [];

      for (const v of Array.from(title)) {
        if (
          lines.length &&
          ctx.measureText(lines[lines.length - 1]).width < innerWidth - 150
        ) {
          lines[lines.length - 1] += v;
          continue;
        }

        if (maxLine === lines.length) {
          lines[lines.length - 1] = lines[lines.length - 1].replace(/.$/, '…');
          break;
        }

        lines.push(v);
      }

      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          innerX + 50,
          innerY * 2 + 50 + (fontSize + 10) * (i * 1.3),
        );
      });
    }

    // 署名
    ctx.font = `300 50px MPLUSRounded1c`;
    const name = '@shota1995m';
    ctx.fillText(
      name,
      innerWidth - ctx.measureText(name).width,
      height - 50 - innerX,
    );
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
