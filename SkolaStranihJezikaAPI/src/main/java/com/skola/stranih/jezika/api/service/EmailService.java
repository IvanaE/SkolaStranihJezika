package com.skola.stranih.jezika.api.service;

import lombok.AllArgsConstructor;
import org.apache.commons.codec.binary.Base64OutputStream;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import javax.mail.internet.MimeMessage;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@Component
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    public static String imgToBase64String(final BufferedImage bufferedImage) throws IOException {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        OutputStream b64 = new Base64OutputStream(os);
        ImageIO.write(bufferedImage, "png", b64);
        String result = os.toString(StandardCharsets.UTF_8);
        return result;
    }

    public void posaljiRezervaciju(String from, String to, String subject, String msg, BufferedImage qrcode) throws IOException {
        msg += "<img height=\"250\" width=\"250\" src=\"data:image/png;base64, " + imgToBase64String(qrcode) + "\"/>";
        try {
            MimeMessage poruka = emailSender.createMimeMessage();
            poruka.setSubject(subject);
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(poruka, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setText(msg, true);
            emailSender.send(poruka);
        } catch (Exception exception) {
            System.out.println(exception);
        }
    }

    public void posaljiRezervaciju(String from, String to, String subject, String msg) throws IOException {
        try {
            MimeMessage poruka = emailSender.createMimeMessage();
            poruka.setSubject(subject);
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(poruka, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setText(msg, true);
            emailSender.send(poruka);
        } catch (Exception exception) {
            System.out.println(exception);
        }
    }
}
