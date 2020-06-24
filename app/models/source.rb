# == Schema Information
#
# Table name: sources
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_sources_on_name  (name)
#
class Source < ApplicationRecord
  has_many :feeds,
    foreign_key: :source_id,
    class_name: :Feed
end
