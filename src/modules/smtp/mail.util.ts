import { rejects } from 'assert';
import nodemailer from 'nodemailer'
import { resolve } from 'path';

export const sendEmail = (message, {host, port, user, pass}) => {
  if (!host || !port || !user || !pass) {
    console.log('邮箱配置不正确，无法发送邮件');
    return
  }

  let transport = nodemailer.createTransport({
    host,
    port,
    secureConenction: true,
    secure: true,
    auth: {
      user,
      pass,
    }
  })

  return new Promise((resolve, reject) => {
    transport.sendEmail(message, function(err, info) {
      if (err) {
        console.log('发送邮件失败', err);
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}