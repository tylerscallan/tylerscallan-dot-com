FROM alpine:3.19
RUN apk add --no-cache imagemagick libwebp-tools bash
COPY scripts/generate-thumbnails.sh /scripts/
RUN chmod +x /scripts/generate-thumbnails.sh
WORKDIR /app
ENTRYPOINT ["/scripts/generate-thumbnails.sh"]
