FactoryBot.define do
  factory :employer do
    name {'test'}
    start_date { 1.day.ago }
    end_date { Time.now }
  end
end
