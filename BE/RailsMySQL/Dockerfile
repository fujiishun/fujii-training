FROM ruby:3.1
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    default-mysql-client \
    yarn

WORKDIR /RailsMySQL
COPY Gemfile Gemfile.lock /RailsMySQL/
RUN bundle install
