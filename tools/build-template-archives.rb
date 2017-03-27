#!/usr/bin/env ruby

def build_template_archive(url_prefix, category, name)
  puts "build"
  puts url_prefix
  url = [url_prefix, category, name].join('/')
  host = url[/http:\/\/(.*?)\//, 1]
  canonical_host='semantic-ui-forest.com'
  html_file = [url_prefix[/http:\/\/(.*)/, 1], category, name].join('/') + '.html'
  `wget --adjust-extension --page-requisites --execute robots=off --convert-links #{url}`
  `cat #{html_file} | grep -v #{host} > #{html_file + '.tmp'}`
  `mv #{html_file + '.tmp'} #{html_file}`
  `mv #{host} #{canonical_host}`
  `mkdir -p #{category}`
  `tar czf #{category + '/' + name + '.tar.gz'} #{canonical_host}`
  `rm -rf #{canonical_host}`
end

def main(url_prefix)
  puts "main"
  puts url_prefix
  templates = {
    'bootstrap' => [
      'blog',
      'dashboard',
      'jumbotron',
      'navbar-static-top',
      'offcanvas',
      'sticky-footer-navbar',
      'carousel',
      'grid',
      'justified-nav',
      'navbar',
      'signin',
      'sticky-footer',
      'cover',
      'jumbotron-narrow',
      'navbar-fixed-top',
      'non-responsive',
      'starter-template',
      'theme'
    ],
    'semantic-ui' => [
      'fixed',
      'homepage',
      'login',
      'sticky'
    ]
  }

  templates.each do |category, template_list|
    template_list.each do |template|
      build_template_archive url_prefix, category, template
    end
  end
end

if __FILE__ == $0
  main ARGV[0]
end
