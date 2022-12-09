FROM ruby:3.1

WORKDIR /RailsMySQL
COPY Gemfile Gemfile.lock /RailsMySQL/
RUN bundle install

CMD ["rails","server","-b","0.0.0.0"]
