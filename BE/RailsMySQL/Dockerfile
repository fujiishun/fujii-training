FROM ruby:3.1
RUN apt-get update && apt-get install -y \
    nodejs \
    default-mysql-client \
    yarn

WORKDIR /RailsMySQL
COPY Gemfile Gemfile.lock /RailsMySQL/
RUN bundle install

CMD ["rails","server","-b","0.0.0.0"]
